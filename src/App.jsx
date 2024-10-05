import { useEffect, useState } from "react";
import { getInfo } from "./api";
import LeadItem from "./components/leadItem";
import { Skeleton } from "@chakra-ui/react";

function App() {
  const [leads, setLeads] = useState([]);
  const [isloadingLeads, setIsLoadingLeads] = useState([]);
  const [isOpenLeads, setIsOpenLeads] = useState(null);

  let total = 0;

  useEffect(() => {
    const limit = 3;
    let pages = 1;
    let intervalId;
    let isFetching = false;

    const getDataInfo = async () => {
      if (isFetching) return;

      isFetching = true;

      const res = await getInfo(`/api/v4/leads?limit=${limit}&page=${pages}`);
      const leads = res._embedded?.leads || [];

      if (leads.length > 0) {
        const loadingLeads = leads.map((lead) => lead.id);
        setIsLoadingLeads((prev) => [...prev, ...loadingLeads]);

        setLeads((prevLeads) => [...prevLeads, ...leads]);
        setLeads((prev) => [...prev, ...leads]);

        pages++;
      }

      if (!leads || leads.length === 0) {
        clearInterval(intervalId);
      }

      setTimeout(() => {
        setIsLoadingLeads((prev) =>
          prev.filter((id) => !leads.some((lead) => lead.id === id))
        );
      }, 1000);

      isFetching = false;
    };

    getDataInfo().then(() => (intervalId = setInterval(getDataInfo, 1000)));

    return () => {
      isFetching = false;
      clearInterval(intervalId);
    };
  }, []);

  leads.forEach((el) => (total += +el.price));

  return (
    <section className="flex items-center justify-center flex-col">
      <div className="max-w-xs w-full">
        <h1 className="text-xl font-bold mb-3 text-center">Список сделок</h1>
        <div className="flex mb-4 justify-between">
          <p>{leads.length} сделок: </p>
          <p>{total} руб</p>
        </div>
        <div className="border-t-2 py-3">
          {leads.length > 0 &&
            leads?.map((item) => (
              <Skeleton
                fadeDuration={1}
                key={item.id}
                isLoaded={!isloadingLeads.includes(item.id)}
                className="mb-3 last:mb-0"
              >
                <LeadItem
                  data={item}
                  isOpen={isOpenLeads}
                  setOpen={setIsOpenLeads}
                />
              </Skeleton>
            ))}
        </div>
      </div>
    </section>
  );
}

export default App;
