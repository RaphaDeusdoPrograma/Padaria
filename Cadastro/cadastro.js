document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o envio do formulário para realizar validações

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("message");

  // Limpa qualquer mensagem anterior
  message.textContent = "";

  // Validação do Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    message.textContent = "Por favor, insira um email válido.";
    message.style.color = "red";
    return;
  }

  // Verificação de senha preenchida
  if (password.length < 6) {
    message.textContent = "A senha deve ter pelo menos 6 caracteres.";
    message.style.color = "red";
    return;
  }

  // Verificação de confirmação de senha
  if (password !== confirmPassword) {
    message.textContent = "As senhas não coincidem.";
    message.style.color = "red";
    return;
  }

  // Carregar os usuários existentes do Local Storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar se o email já está cadastrado
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    message.textContent = "Este email já está cadastrado. Use um email diferente.";
    message.style.color = "red";
    return;
  }

  // Adicionar o novo usuário ao array de usuários
  users.push({ email: email, password: password });

  // Salvar o array atualizado no Local Storage
  localStorage.setItem("users", JSON.stringify(users));

  // Exibe uma mensagem de sucesso temporária
  message.textContent = "Cadastro realizado com sucesso!";
  message.style.color = "green";

  // Redireciona para a página de login após 1 segundo
  setTimeout(() => {
    window.location.href = "/Login/login.html"; // Caminho relativo para a página de login
  }, 1000);
});


  
  
