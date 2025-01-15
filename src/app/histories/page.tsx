import { HistoriesList } from "~/components/histories";
import Histories from "~/config/histories";

export default function HistoriesPage() {
  return (
    <main className="min-h-screen w-full bg-black p-5 text-white">
      <h1 className="m-5 text-center text-5xl">Choose a story</h1>
      <HistoriesList arr={Histories} />
    </main>
  );
}
