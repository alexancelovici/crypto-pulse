import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import useFetchCoins from "../hooks/useFetchCoins";

const AppLayout = () => {
  const [search, setSearch] = useState("");
  const { coins, loading, refetch } = useFetchCoins();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-canvas text-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          search={search}
          onSearchChange={setSearch}
          onRefresh={refetch}
          refreshing={loading}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet context={{ search, coins, loading }} />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
