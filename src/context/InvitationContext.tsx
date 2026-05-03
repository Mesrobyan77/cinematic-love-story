import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

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
  loading: boolean;
  error: string | null;
};

const InvitationContext = createContext<InvitationContextType>({ 
  data: DEFAULT_DATA, 
  loading: false, 
  error: null 
});

export const InvitationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useLocation is inside BrowserRouter so it's safe to use
  const location = useLocation();

  useEffect(() => {
    // Check if the URL is /:slug/:date
    const pathParts = location.pathname.split("/").filter(Boolean);
    
    // If we have 2 parts (slug and date) -> Fetch from Backend
    if (pathParts.length >= 2) {
      const slug = pathParts[0];
      const dateSlug = pathParts[1];
      const apiUrl = import.meta.env.VITE_API_URL || "https://backend.amorete.am"; // Fallback URL
      
      setLoading(true);
      fetch(`${apiUrl}/api/invitations/${slug}/${dateSlug}`)
        .then(res => {
          if (!res.ok) throw new Error("Invitation not found");
          return res.json();
        })
        .then(resData => {
          // If the backend wraps the response in { success: true, data: {...} }
          const inviteData = resData.data ? resData.data : resData;
          setData((prev) => ({ ...prev, ...inviteData }));
        })
        .catch(err => {
          console.error(err);
          setError("Հրավիրատոմսը չի գտնվել");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // We are in the root / (Demo mode)
      // Listen to postMessage for Live Preview
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === "UPDATE_PREVIEW" && event.data.payload) {
          setData((prev) => ({
            ...prev,
            ...event.data.payload,
          }));
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, [location.pathname]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-ivory text-charcoal font-display">Բեռնվում է...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-ivory text-charcoal font-display">{error}</div>;
  }

  return (
    <InvitationContext.Provider value={{ data, loading, error }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => useContext(InvitationContext);
