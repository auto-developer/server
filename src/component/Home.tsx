import React from "react"

export type HomeProps = {
    title: string
}

const Home = (props: HomeProps) => <html>
<head>
    <meta charSet="UTF-8"/>
    <title>{props.title}</title>
    <link rel="stylesheet" href="/style.css"/>
</head>
<body>
<h1>Auth平台</h1>
<a href="/session">sign in</a>
<a href="/user">sign up</a>
</body>
</html>

export default Home
