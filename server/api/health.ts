export default defineEventHandler(async (event) => {
  const data = await event.context.prisma.user.findMany();
  return {
    status: "ok",
    data,
  };
});
