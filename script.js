const passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];

function generatePassword() {
  const length = document.getElementById('length').value;
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const specialChars = document.getElementById('specialChars').checked;
  const uniqueChars = document.getElementById('uniqueChars').checked;
  const mnemonic = document.getElementById('mnemonic').checked;
  const showPassword = document.getElementById('showPassword').checked;

  let characters = '';
  let password = '';

  if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) characters += '0123456789';
  if (specialChars) characters += '!@#$%^&*()_+[]{}|;:,.<>?';
  if (mnemonic) characters += 'aeiouAEIOU';

  for (let i = 0; i < length; i++) {
    let randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    if (uniqueChars && password.includes(randomChar)) {
      i--;
      continue;
    }
    password += randomChar;
  }

  document.getElementById('passwordOutput').innerText = password;

  if (showPassword) {
    document.getElementById('passwordOutput').style.display = 'block';
  } else {
    document.getElementById('passwordOutput').style.display = 'none';
  }

  passwordHistory.push({
    password,
    note: '',
  });

  localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
  updatePasswordHistory();
}

function updatePasswordHistory() {
  const passwordHistoryElement = document.getElementById('passwordHistory');
  passwordHistoryElement.innerHTML = '<h3>Şifre Geçmişi</h3>';
  if (passwordHistory.length > 0) {
    passwordHistoryElement.innerHTML += '<ul>';
    for (let i = 0; i < passwordHistory.length; i++) {
      passwordHistoryElement.innerHTML += `<li>${passwordHistory[i].password} - <input type="text" class="noteInput" placeholder="Not" value="${passwordHistory[i].note}" onchange="updateNote(${i}, this.value)"></li>`;
    }
    passwordHistoryElement.innerHTML += '</ul>';
  } else {
    passwordHistoryElement.innerHTML += '<p>Henüz şifre üretilmedi.</p>';
  }
}

function copyToClipboard() {
  const passwordOutput = document.getElementById('passwordOutput');
  const textarea = document.createElement('textarea');
  textarea.value = passwordOutput.innerText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Şifre kopyalandı!');
}

function clearPasswordHistory() {
  passwordHistory.length = 0;
  localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
  updatePasswordHistory();
}

function updateNote(index, value) {
  passwordHistory[index].note = value;
  localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
}

window.onload = updatePasswordHistory;