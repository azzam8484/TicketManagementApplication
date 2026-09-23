package com.ticketmanagement;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TicketApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createTicket_validBody_returns201AndOpenStatus() throws Exception {
        mockMvc.perform(post("/api/v1/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Login broken",
                                  "description": "Cannot sign in",
                                  "priority": "HIGH",
                                  "assignee": "Azzam"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/api/v1/tickets/")))
                .andExpect(jsonPath("$.status", is("OPEN")))
                .andExpect(jsonPath("$.title", is("Login broken")))
                .andExpect(jsonPath("$.priority", is("HIGH")));
    }

    @Test
    void createTicket_missingTitle_returns400() throws Exception {
        mockMvc.perform(post("/api/v1/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "description": "Missing title",
                                  "priority": "LOW"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")));
    }

    @Test
    void getTicket_unknownId_returns404() throws Exception {
        mockMvc.perform(get("/api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code", is("NOT_FOUND")));
    }

    @Test
    void updateFields_changesValues_statusUnchanged() throws Exception {
        String id = createTicket("Original", "Desc", "LOW");

        mockMvc.perform(patch("/api/v1/tickets/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Updated",
                                  "description": "New desc",
                                  "priority": "MEDIUM",
                                  "assignee": "Sara"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Updated")))
                .andExpect(jsonPath("$.assignee", is("Sara")))
                .andExpect(jsonPath("$.status", is("OPEN")));
    }

    @Test
    void updateFields_blankTitle_returns400() throws Exception {
        String id = createTicket("Title", "Desc", "LOW");

        mockMvc.perform(patch("/api/v1/tickets/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "title": "   " }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")))
                .andExpect(jsonPath("$.fields.title", is("Title is required")));
    }

    @Test
    void createTicket_digitsOnlyTitleAndDescription_returns400() throws Exception {
        mockMvc.perform(post("/api/v1/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "12345",
                                  "description": "67890",
                                  "priority": "MEDIUM"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")))
                .andExpect(jsonPath("$.fields.title", is("Title cannot be only digits")))
                .andExpect(jsonPath("$.fields.description", is("Description cannot be only digits")));
    }

    @Test
    void updateFields_digitsOnlyDescription_returns400() throws Exception {
        String id = createTicket("Title", "Desc", "LOW");

        mockMvc.perform(patch("/api/v1/tickets/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "description": "999" }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")))
                .andExpect(jsonPath("$.fields.description", is("Description cannot be only digits")));
    }

    @Test
    void updateFields_withStatus_returns400() throws Exception {
        String id = createTicket("Title", "Desc", "LOW");

        mockMvc.perform(patch("/api/v1/tickets/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "title": "Still open", "status": "IN_PROGRESS" }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")));
    }

    @Test
    void comments_addAndAppearOnDetailInOrder() throws Exception {
        String id = createTicket("With comments", "Desc", "MEDIUM");

        mockMvc.perform(post("/api/v1/tickets/" + id + "/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "text": "First comment" }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.text", is("First comment")));

        mockMvc.perform(post("/api/v1/tickets/" + id + "/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "text": "Second comment" }
                                """))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/tickets/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comments", hasSize(2)))
                .andExpect(jsonPath("$.comments[0].text", is("First comment")))
                .andExpect(jsonPath("$.comments[1].text", is("Second comment")));
    }

    @Test
    void addComment_updatesTicketUpdatedAt() throws Exception {
        String id = createTicket("Comment bumps updatedAt", "Desc", "MEDIUM");

        MvcResult before = mockMvc.perform(get("/api/v1/tickets/" + id))
                .andExpect(status().isOk())
                .andReturn();
        String updatedBefore = objectMapper.readTree(before.getResponse().getContentAsString())
                .get("updatedAt")
                .asText();

        Thread.sleep(15);

        mockMvc.perform(post("/api/v1/tickets/" + id + "/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "text": "Activity comment" }
                                """))
                .andExpect(status().isCreated());

        MvcResult after = mockMvc.perform(get("/api/v1/tickets/" + id))
                .andExpect(status().isOk())
                .andReturn();
        String updatedAfter = objectMapper.readTree(after.getResponse().getContentAsString())
                .get("updatedAt")
                .asText();

        org.junit.jupiter.api.Assertions.assertTrue(
                java.time.Instant.parse(updatedAfter).isAfter(java.time.Instant.parse(updatedBefore)),
                "expected updatedAt to advance after comment");
    }

    @Test
    void addComment_blankText_returns400() throws Exception {
        String id = createTicket("Title", "Desc", "LOW");

        mockMvc.perform(post("/api/v1/tickets/" + id + "/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "text": "  " }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")));
    }

    @Test
    void addComment_missingTicket_returns404() throws Exception {
        mockMvc.perform(post("/api/v1/tickets/3fa85f64-5717-4562-b3fc-2c963f66afa6/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "text": "Orphan comment" }
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code", is("NOT_FOUND")));
    }

    @Test
    void list_searchAndFilter_workTogether() throws Exception {
        createTicket("Login issue", "Chrome problem", "HIGH");
        createTicket("Password reset", "Email delayed", "MEDIUM");
        String inProgressId = createTicket("Login network", "VPN related", "LOW");
        changeStatus(inProgressId, "IN_PROGRESS");

        mockMvc.perform(get("/api/v1/tickets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(3)));

        mockMvc.perform(get("/api/v1/tickets").param("status", "OPEN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(2)));

        mockMvc.perform(get("/api/v1/tickets").param("keyword", "login"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(2)));

        mockMvc.perform(get("/api/v1/tickets")
                        .param("keyword", "login")
                        .param("status", "IN_PROGRESS"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(1)))
                .andExpect(jsonPath("$.items[0].title", is("Login network")));
    }

    @Test
    void list_invalidStatus_returns400() throws Exception {
        mockMvc.perform(get("/api/v1/tickets").param("status", "UNKNOWN"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code", is("VALIDATION_ERROR")));
    }

    @Test
    void stateMachine_happyPath_succeeds() throws Exception {
        String id = createTicket("Happy path", "Flow", "HIGH");

        changeStatus(id, "IN_PROGRESS");
        changeStatus(id, "RESOLVED");
        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "CLOSED" }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("CLOSED")));
    }

    @Test
    void stateMachine_cancelFromOpen_succeeds() throws Exception {
        String id = createTicket("Cancel open", "Flow", "LOW");
        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "CANCELLED" }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("CANCELLED")));
    }

    @Test
    void stateMachine_cancelFromInProgress_succeeds() throws Exception {
        String id = createTicket("Cancel in progress", "Flow", "LOW");
        changeStatus(id, "IN_PROGRESS");
        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "CANCELLED" }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("CANCELLED")));
    }

    @Test
    void stateMachine_closedToOpen_returns409AndKeepsClosed() throws Exception {
        String id = createTicket("Closed ticket", "Flow", "HIGH");
        changeStatus(id, "IN_PROGRESS");
        changeStatus(id, "RESOLVED");
        changeStatus(id, "CLOSED");

        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "OPEN" }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code", is("INVALID_STATUS_TRANSITION")));

        mockMvc.perform(get("/api/v1/tickets/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("CLOSED")));
    }

    @Test
    void stateMachine_openToResolved_returns409() throws Exception {
        String id = createTicket("Skip step", "Flow", "MEDIUM");

        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "RESOLVED" }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code", is("INVALID_STATUS_TRANSITION")));
    }

    @Test
    void stateMachine_inProgressToClosed_returns409() throws Exception {
        String id = createTicket("Skip resolve", "Flow", "MEDIUM");
        changeStatus(id, "IN_PROGRESS");

        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "CLOSED" }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code", is("INVALID_STATUS_TRANSITION")));
    }

    @Test
    void stateMachine_cancelledToOpen_returns409() throws Exception {
        String id = createTicket("Cancelled ticket", "Flow", "LOW");
        changeStatus(id, "CANCELLED");

        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "OPEN" }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code", is("INVALID_STATUS_TRANSITION")));

        mockMvc.perform(get("/api/v1/tickets/" + id))
                .andExpect(jsonPath("$.status", is("CANCELLED")));
    }

    private String createTicket(String title, String description, String priority) throws Exception {
        MvcResult result = mockMvc.perform(post("/api/v1/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "%s",
                                  "description": "%s",
                                  "priority": "%s"
                                }
                                """.formatted(title, description, priority)))
                .andExpect(status().isCreated())
                .andReturn();
        JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString());
        return node.get("id").asText();
    }

    private void changeStatus(String id, String status) throws Exception {
        mockMvc.perform(patch("/api/v1/tickets/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "status": "%s" }
                                """.formatted(status)))
                .andExpect(status().isOk());
    }
}
