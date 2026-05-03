import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// The default data that the template uses when no live preview data is sent
const DEFAULT_DATA = {
  couple: {
    bride: "Ամելիա",
    groom: "Ջուլիան",
    title: "ինչպես ամեն ինչ սկսվեց",
    subtitle: "Սիրո Ֆիլմ",
  },
  event: {
    ceremony: {
      time: "15:00",
      place: "Վիլլա Բելմոնտե",
      address: "Կոմո լիճ, Իտալիա",
      mapUrl: "https://maps.app.goo.gl/xxx",
    },
    reception: {
      time: "17:00",
      place: "Վիլլա Բելմոնտե",
      address: "Կոմո լիճ, Իտալիա",
    },
    party: {
      time: "20:00",
      place: "Վիլլա Բելմոնտե",
      address: "Կոմո լիճ, Իտալիա",
    }
  },
  texts: {
    welcome: "Միացե՛ք մեզ",
    invitationLine1: "Մենք ամուսնանում ենք",
    invitationLine2: "14 Սեպտեմբեր 2026",
    openEnvelope: "Բացել Հրավերը",
  },
  sections: {
    gallery: true,
    timeline: true,
    dressCode: true,
    rsvp: true,
    music: true,
    calendar: true,
    countdown: true,
  },
  calendar: {
    monthName: "Սեպտեմբեր",
    year: 2026,
    weekdays: "Երկ,Երք,Չոր,Հնգ,Ուրբ,Շբթ,Կիր",
    firstDayOffset: 1, // Sept 1, 2026 is Tuesday (0=Mon, 1=Tue)
    daysInMonth: 30,
    weddingDay: 14,
  },
  couplePhoto: "", // defaults to imported heroImg if empty
  musicUrl: "", // defaults to imported backgroundMusic if empty
};

type InvitationContextType = {
  data: typeof DEFAULT_DATA;
};

const InvitationContext = createContext<InvitationContextType>({ data: DEFAULT_DATA });

export const InvitationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // The admin panel sends { type: "UPDATE_PREVIEW", payload: { ... } }
      if (event.data?.type === "UPDATE_PREVIEW" && event.data.payload) {
        // Deep merge or simply replace data. 
        // We replace it but fallback to defaults for deeply nested objects if needed.
        // For simplicity, we just merge the top level
        setData((prev) => ({
          ...prev,
          ...event.data.payload,
        }));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <InvitationContext.Provider value={{ data }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => useContext(InvitationContext);
