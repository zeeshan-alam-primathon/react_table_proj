import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Table from "./components/Table";
import { URl } from "./utils/constant";

function App() {
  const client = new ApolloClient({
    uri: URl,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Table />
      </div>
    </ApolloProvider>
  );
}

export default App;
