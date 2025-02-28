import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { UserData, FormState, CounterState } from "../types";

interface AppContextType {
  userData: UserData[];
  formState: FormState;
  counterState: CounterState;
  hasUnsavedChanges: boolean;
  setFormState: (state: FormState) => void;
  saveUserData: () => void;
  incrementCounter: () => void;
  decrementCounter: () => void;
  resetCounter: () => void;
  richTextContent: string;
  setRichTextContent: (content: string) => void;
  resetUnsavedChanges: () => void;
}

const initialFormState: FormState = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

const initialCounterState: CounterState = {
  count: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [counterState, setCounterState] =
    useState<CounterState>(initialCounterState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [richTextContent, setRichTextContent] = useState("");

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    const savedCounter = localStorage.getItem("counterState");
    const savedRichText = localStorage.getItem("richTextContent");

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    if (savedCounter) {
      setCounterState(JSON.parse(savedCounter));
    }

    if (savedRichText) {
      setRichTextContent(savedRichText);
    }
  }, []);

  // Save counter state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("counterState", JSON.stringify(counterState));
  }, [counterState]);

  // Save rich text content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("richTextContent", richTextContent);
  }, [richTextContent]);

  // Track unsaved changes in the form
  useEffect(() => {
    if (
      formState.name !== "" ||
      formState.address !== "" ||
      formState.email !== "" ||
      formState.phone !== ""
    ) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [formState]);

  // Warn user about unsaved changes when leaving the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const saveUserData = () => {
    const newUser: UserData = {
      id: uuidv4(),
      ...formState,
    };

    const updatedUserData = [...userData, newUser];
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setFormState(initialFormState);
    setHasUnsavedChanges(false);
  };

  const incrementCounter = () => {
    setCounterState((prev) => ({ count: prev.count + 1 }));
  };

  const decrementCounter = () => {
    setCounterState((prev) => ({ count: Math.max(0, prev.count - 1) }));
  };

  const resetCounter = () => {
    setCounterState({ count: 0 });
  };

  const resetUnsavedChanges = () => {
    setHasUnsavedChanges(false);
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        formState,
        counterState,
        hasUnsavedChanges,
        setFormState,
        saveUserData,
        incrementCounter,
        decrementCounter,
        resetCounter,
        richTextContent,
        setRichTextContent,
        resetUnsavedChanges,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
