commands:
	pnpm create next-app nextjs-server-action-app
	# Prisma
	pnpm prisma init --datasource-provider sqlite
	pnpm prisma migrate dev --name 'initial migration'                

packages:
	pnpm add -D prisma 
	pnpm add @prisma/client
	pnpm add zod
	