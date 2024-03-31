import { AuthenticationProvider } from "./authentication-provider";
import { ModalProvider } from "./modal-provider";
import { ReactQueryProvider } from "./query-provider";
import { SocketProvider } from "./socket-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <SocketProvider />
        <ModalProvider />
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </ReactQueryProvider>
    </>
  );
}
