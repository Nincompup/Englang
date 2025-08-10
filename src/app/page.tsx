import AddCardForm from "@/components/AddCardForm";
import CardList from "@/components/CardList";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Cards</h1>
      <AddCardForm />
      <CardList/>
    </main>
  );
}

