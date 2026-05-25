document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const forgotForm = document.getElementById('forgotForm');
  const forgotMessage = document.getElementById('forgotMessage');

  async function postJson(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const accountId = document.getElementById('accountId').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      const result = await postJson('/api/login', { accountId, username, password });

      if (result.success) {
        alert(`Welcome ${result.data.username}! Signed in as ${result.data.role} for ${result.data.clinicName}.`);
      } else {
        alert(result.message || 'Login failed.');
      }
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const accountId = document.getElementById('resetAccountId').value.trim();
      const username = document.getElementById('resetUsername').value.trim();

      if (!accountId || !username) {
        forgotMessage.textContent = 'Please provide both Account ID and Username, or contact us at daviddegroeve@gmail.com.';
        forgotMessage.style.color = '#b91c1c';
        return;
      }

      const result = await postJson('/api/forgot-password', { accountId, username });
      forgotMessage.textContent = result.message;
      forgotMessage.style.color = result.success ? '#15803d' : '#b91c1c';
    });
  }
});
