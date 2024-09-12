function EmailTemplate({
  title = "Thank you for signing up",
  name = "",
  verificationCode = "",
  verificationLink = "",
}) {
  return `
  <div
      style="
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        font-family: sans-serif;
      "
    >
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          margin-top: 50px;
        "
      >
        <img
          src="https://res.cloudinary.com/myshop-it/image/upload/v1708186379/logo_ollsvf.png"
          width="93"
          height="35"
        />
          ${name}      
      </header>
      <main
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: left;
        "
      >
        <div>
          <h1
            style="
              padding: 0;
              margin: 0;
              color: #000000;
              font-weight: 500;
              font-size: 24px;
              line-height: 1.333;
            "
          >
            ${title}
          </h1>
          <p
            style="
              padding-top: 16px;
              margin: 0;
              color: rgba(0, 0, 0, 0.9);
              font-weight: 400;
              font-size: 16px;
              line-height: 1.25;
            "
          >
           Enter this code or click the button below to confirm your email.
          </p>
          <p
            style="
              padding-top: 16px;
              margin: 0;
              color: #5a6b51;
              font-weight: 500;
              letter-spacing: 1.5px;
              font-size: 32px;
              text-align: center;
            "
          >
            ${verificationCode}
          </p>
        </div>
       <a
        href="${verificationLink}"
        style="
          padding: 12px 24px;
          word-wrap: break-word;
          color: #ffffff;
          font-weight: 400;
          display: inline-block;
          text-decoration: none;
          padding-left: 24px;
          font-size: 16px;
          line-height: 1.25em;
          border-color: #0a66c2;
          background-color: #0a66c2;
          border-radius: 34px;
          word-break: break-word;
          border-width: 1px;
          border-style: solid;
          margin-bottom: 24px;
        "
      >
        Confirm your email
      </a>
      </main>
    </div>`;
}

module.exports = { EmailTemplate };
