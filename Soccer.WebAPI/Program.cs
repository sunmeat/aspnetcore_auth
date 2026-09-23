using Soccer.Application.DependencyInjection;
using Soccer.Infrastructure.DependencyInjection;
using Soccer.Infrastructure.Persistence;

// ==========================================================================================
// у Firebase Console:
// Settings > Service accounts > Generate new private key > Download the JSON file
// файл кладемо в Soccer.Infrastructure\firebase.json (з внесенням в .gitignore!)
// ==========================================================================================
// отримання Client ID та Client Secret:
// https://github.com/settings/developers
// new OAuth app (OAuth - це протокол авторизації,
// який дозволяє стороннім додаткам отримувати обмежений доступ до облікових записів користувачів на веб-сервісах)
// application name: Soccer App
// Homepage URL: https://localhost:3000 (потім можна змінити на назву сайту на Netlify, Vercel, Firebase Hosting тощо)
// Redirect URI: https://alex-odesa.firebaseapp.com/__/auth/handler
// Expire user access tokens - галочку знімаємо
// Register Application
// Client ID: Ov23linouG221Hz*****
// Client Secret: 1a3f1dfe1fc67164ae0a6edb788f7e1c34e*****
// ==========================================================================================
// у Firebase Console:
// Authentication > Sign-in method > GitHub > Enable
// Client ID: Ov23linouG221Hz*****
// Client Secret: 1a3f1dfe1fc67164ae0a6edb788f7e1c34e*****
// ==========================================================================================

// View > Terminal:
// cd react.client
// npm install firebase (має автоматично підтягнутися)

// ==========================================================================================
// react.client > src > firebase > firebase.js
// react.client > src > firebase > authService.js
// react.client > src > App.jsx + Login.jsx
// ==========================================================================================

/* як код розуміє, що це наш додаток:
1) у Firebase Console ми вмикаємо провайдер GitHub і вставляємо: Client ID та Client Secret.

>>> Client ID - публічний ідентифікатор додатку.
Firebase передає його GitHub, щоб GitHub знав, який саме додаток просить доступ.

>>> Client Secret - секретний ключ.
Firebase використовує його тільки на сервері, щоб обміняти код авторизації на токен.
без нього ніхто інший не зможе видати себе за наш додаток.

2) коли в React викликається signInWithPopup(auth, githubProvider) Firebase вже знає,
який Client ID і Secret використовувати, бо вони збережені у налаштуваннях проєкту.

3) Firebase відкриває попап GitHub з Client ID. GitHub бачить цей Client ID та розуміє,
що це саме наш OAuth-додаток і показує користувачу: «Додаток хоче доступ до акаунту».

4) після підтвердження GitHub повертає код тільки на Callback URL (https://alex-odesa.firebaseapp.com/__/auth/handler).
цей URL належить тільки нашому Firebase-проєкту.

5) Firebase обмінює код на токен (використовуючи Client Secret, який знає лише він) і створює користувача в проєкті.
*/

var builder = WebApplication.CreateBuilder(args);

string firebasePath = Path.GetFullPath(
    Path.Combine(
        builder.Environment.ContentRootPath,
        "..",
        "Soccer.Infrastructure",
        "firebase.json"));

builder.Services.AddInfrastructure(firebasePath);
builder.Services.AddApplication();

builder.Services.AddControllers();

var app = builder.Build();

using (IServiceScope scope = app.Services.CreateScope())
{
    FirestoreSeeder seeder = scope.ServiceProvider.GetRequiredService<FirestoreSeeder>();
    await seeder.SeedAsync();
}

app.MapControllers();

app.Run();