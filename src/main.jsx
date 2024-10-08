import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux";
import { NoInternetConnectionWrapper } from "./general-components";

// FETCHING SECRET KEY TO INITIALIZE CLERK PROVIDER
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoInternetConnectionWrapper>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Provider store={store}>
          <RouterProvider router={appRoutes} />
        </Provider>
      </ClerkProvider>
    </NoInternetConnectionWrapper>
  </StrictMode>
);
