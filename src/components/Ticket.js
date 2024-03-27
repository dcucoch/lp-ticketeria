import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

// Component for the ticket form
function TicketForm({ onSubmit, parentId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('Baja');
  const [source, setSource] = useState('Teléfono');
  const [sla, setSla] = useState('24 Horas');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status: 'Abierto', assignee: null, comments: [], parentId, email, priority, source, sla, createdAt: new Date(), dueDate: null });
    setTitle('');
    setDescription('');
    setEmail('');
    setPriority('Baja');
    setSource('Teléfono');
    setSla('24 Horas');
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <input
        className="input-field"
        type="text"
        placeholder="Título del ticket"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input-field"
        placeholder="Descripción del ticket"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="input-field"
        type="email"
        placeholder="Email del usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="input-label">Prioridad:</label>
      <select className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
      <label className="input-label">Fuente de ticket:</label>
      <select className="input-field" value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="Teléfono">Teléfono</option>
        <option value="Correo electrónico">Correo electrónico</option>
        <option value="Chat en vivo">Chat en vivo</option>
      </select>
      <label className="input-label">SLA:</label>
      <select className="input-field" value={sla} onChange={(e) => setSla(e.target.value)}>
        <option value="24 Horas">24 Horas</option>
        <option value="48 Horas">48 Horas</option>
        <option value="72 Horas">72 Horas</option>
      </select>
      <button className="submit-button" type="submit">Crear Ticket</button>
    </form>
  );
}

// Component for displaying a ticket
function Ticket({ ticket, onAssign, onComplete, onComment, onThread }) {
  return (
    <div className="ticket-container">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="ticket-info">
        <p><strong>Estado:</strong> {ticket.status}</p>
        <p><strong>SLA:</strong> {ticket.sla}</p>
        <p><strong>Prioridad:</strong> {ticket.priority}</p>
        <p><strong>Fecha de cierre:</strong> {ticket.dueDate ? ticket.dueDate.toLocaleString() : 'No definida'}</p>
        <p><strong>Usuario:</strong> {ticket.email}</p>
        <p><strong>Fuente:</strong> {ticket.source}</p>
      </div>
      {ticket.assignee ? (
        <p>Asignado a: {ticket.assignee}</p>
      ) : (
        <button className="action-button" onClick={() => onAssign(ticket)}>Asignar</button>
      )}
      {ticket.status !== 'Cerrado' && (
        <button className="action-button" onClick={() => onComplete(ticket)}>Completar</button>
      )}
      <TicketForm onSubmit={(comment) => onComment(comment, ticket.id)} parentId={ticket.id} />
      <button className="action-button" onClick={() => onThread(ticket)}>Ver hilo</button>
      <div className="comment-section">
        {ticket.comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main helpdesk component
function App() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('Todos');

  // Function to add a new ticket
  const addTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  // Function to assign a ticket
  const assignTicket = (ticket) => {
    const assignedTicket = { ...ticket, assignee: 'Técnico' };
    updateTicket(assignedTicket);
  };

  // Function to complete a ticket
  const completeTicket = (ticket) => {
    const completedTicket = { ...ticket, status: 'Cerrado', dueDate: new Date() };
    updateTicket(completedTicket);
  };

  // Function to add a comment to a ticket
  const addComment = (comment, parentId) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === parentId) {
        return {
          ...ticket,
          comments: [...ticket.comments, comment]
        };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  // Function to update a ticket
  const updateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((t) =>
      t.id === updatedTicket.id ? updatedTicket : t
    );
    setTickets(updatedTickets);
  };

  // Function to view a thread of tickets
  const viewThread = (ticket) => {
    const thread = getTicketThread(ticket, []);
    console.log(thread);
    // Logic to display the ticket thread can be implemented here
  };

  // Function to retrieve the thread of a ticket
  const getTicketThread = (ticket, thread) => {
    if (ticket.parentId !== null) {
      const parentTicket = tickets.find(t => t.id === ticket.parentId);
      if (parentTicket) {
        thread.unshift(parentTicket);
        return getTicketThread(parentTicket, thread);
      }
    }
    return thread;
  };

  // Function to filter tickets based on status
  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'Todos') {
      return true;
    }
    return ticket.status === filter;
  });

  return (    
    <div className="helpdesk-container">
      <h1>Sistema de Helpdesk - Soporte Técnico Informático</h1>
      <Link to="/">Go to Home</Link> {/* Link to home page */}
      <div className="filter-section">
        <label>Filtrar por estado:</label>
        <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Abierto">Abierto</option>
          <option value="En progreso">En progreso</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      </div>
      <TicketForm onSubmit={addTicket} parentId={null} />
      <div className="tickets-container">
        {filteredTickets.map((ticket, index) => (
          <Ticket
            key={index}
            ticket={ticket}
            onAssign={assignTicket}
            onComplete={completeTicket}
            onComment={addComment}
            onThread={viewThread}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
