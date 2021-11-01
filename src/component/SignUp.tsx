import React from "react"


export type SignUpProps = {}

const SignUp = (props: SignUpProps) => <html lang="en">
<head>
    <meta charSet="UTF-8"/>
    <title>sign up</title>
</head>
<body>
<div id="login">
    <h1>Register User</h1>
    <form method="post" action="/user">
        <input type="text" required placeholder="邮箱" name="email" />
        <input type="text" required placeholder="用户名" name="username" />
        <input type="password" required placeholder="密码" name="certificate" />
        <button className="but" type="submit">sign up</button>
    </form>
</div>
</body>

</html>

export default SignUp
