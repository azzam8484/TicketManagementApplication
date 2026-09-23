-- MVP schema: tickets + comments (see spec/data-model.md)

CREATE TABLE tickets (
  id            UUID PRIMARY KEY,
  title         VARCHAR(200)  NOT NULL,
  description   TEXT          NOT NULL,
  status        VARCHAR(32)   NOT NULL,
  priority      VARCHAR(16)   NOT NULL,
  assignee      VARCHAR(100)  NULL,
  created_at    TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at    TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT chk_ticket_status
    CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'CANCELLED')),
  CONSTRAINT chk_ticket_priority
    CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH'))
);

CREATE INDEX idx_ticket_status ON tickets(status);
CREATE INDEX idx_ticket_created_at ON tickets(created_at DESC);

CREATE TABLE comments (
  id          UUID PRIMARY KEY,
  ticket_id   UUID          NOT NULL,
  text        TEXT          NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT fk_comment_ticket
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);

CREATE INDEX idx_comment_ticket_id_created_at
  ON comments(ticket_id, created_at ASC);
