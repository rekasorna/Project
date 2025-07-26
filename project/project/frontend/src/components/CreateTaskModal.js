"use client"

import { useState } from "react"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CreateTaskModal = ({ show, onHide, onCreateTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    startDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    effort: "0h",
    assignee: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onCreateTask) {
      const newTask = {
        ...formData,
        id: Math.floor(Math.random() * 10000),
        startDate: formData.startDate.toLocaleDateString("en-GB"),
        dueDate: formData.dueDate.toLocaleDateString("en-GB"),
        progress: 0,
      }
      onCreateTask(newTask)
    }
    onHide()
    // Reset form
    setFormData({
      title: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      startDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      effort: "0h",
      assignee: "",
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter task description"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <div>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date) => handleChange("startDate", date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <div>
                  <DatePicker
                    selected={formData.dueDate}
                    onChange={(date) => handleChange("dueDate", date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estimated Effort</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.effort}
                  onChange={(e) => handleChange("effort", e.target.value)}
                  placeholder="e.g. 8h, 2d"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Assignee</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.assignee}
                  onChange={(e) => handleChange("assignee", e.target.value)}
                >
                  <option value="">Select assignee</option>
                  <option value="Rajesh Kumar">Rajesh Kumar</option>
                  <option value="Priya Sharma">Priya Sharma</option>
                  <option value="Amit Singh">Amit Singh</option>
                  <option value="Neha Patel">Neha Patel</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateTaskModal
