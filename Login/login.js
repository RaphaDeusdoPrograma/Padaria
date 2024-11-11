document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o envio do formulário para realizar validações

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Limpa qualquer mensagem anterior
  message.textContent = "";

  // Carregar os usuários do Local Storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar se o email e a senha correspondem a um usuário cadastrado
  const validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    message.textContent = "Login realizado com sucesso!";
    message.style.color = "green";

    // Redirecionar para a página principal após login bem-sucedido (exemplo)
    setTimeout(() => {
      window.location.href = "/Home/home.html"; // Página principal ou dashboard
    }, 1000);
  } else {
    message.textContent = "Email ou senha incorretos.";
    message.style.color = "red";
  }
});
  
