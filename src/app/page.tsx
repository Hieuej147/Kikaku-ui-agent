import { prisma } from "@/lib/prisma";
const Home = async () => {
  const posts = await prisma.post.findMany();
  return <div className="font-bold">{JSON.stringify(posts, null, 2)}</div>;
};
export default Home;
