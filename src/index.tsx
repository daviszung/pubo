import * as elements from "typed-html";
import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";

import { App } from "./App";
import { acceptContract } from "./spaceAPI/contracts";

import { dashboardEndpoints } from "./endpoints/dashboard";
import { shipEndpoints } from "./endpoints/ships";
import { Menu } from "./Ship";


const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>beebo</title>
	<script src="https://unpkg.com/htmx.org@1.9.4"></script>
	<link href="/styles.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
${children}
`;

const app = new Elysia()
	.use(html())
	.get("/", ({ html }) => html(
		<BaseHTML>
			<body>
				<App></App>
			</body>
		</BaseHTML>
	))
	.get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
	.group("/dashboard", app => app
		.get("/agent", dashboardEndpoints["agent"])
		.get("/contracts", dashboardEndpoints["contracts"])
		.get("/ships", dashboardEndpoints["ships"])
		.get("/navigation", dashboardEndpoints["navigation"])
		.get("/system", dashboardEndpoints["system"])
	)

	.get("/ships", async ({ query }) => {
		return await shipEndpoints["changeMenu"](query.symbol, query.menu);
	}, {
		query: t.Object({
			symbol: t.String(),
			menu: t.Union([t.Literal("registration"), t.Literal("nav"), t.Literal("tech"), t.Literal("cargo")])
		})
	})
	.post("/contracts/accept/:id", async ({ params }) => {
		const status = await acceptContract(params.id);
		return;
	},
		{
			params: t.Object({
				id: t.String()
			})
		})
	.get("/*", () => "404")
	.listen(3000);



console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
