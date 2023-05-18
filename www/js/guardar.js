const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;

  const datos = `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\n\n`;

  fetch('/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: datos
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
