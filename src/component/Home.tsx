import React from "react"

export type HomeProps = {
    title: string
}

const Home = (props: HomeProps) => <html>
<head>
    <title>{props.title}</title>
    <link rel="stylesheet" href="/style.css"/>
</head>
<body>
        <div className={"flex"}>123</div>
</body>
</html>

export default Home
