"use client";

import { useState, useEffect } from "react";
import { COUNTRY_CODES } from "./constants";

export const useCountryCode = () => {
    const [detectedCode, setDetectedCode] = useState("+90");

    useEffect(() => {
        const detectCountry = async () => {
            const cachedCode = sessionStorage.getItem("atasaedu_user_calling_code");
            if (cachedCode) {
                setDetectedCode(cachedCode);
                return;
            }

            try {
                const response = await fetch("https://ipapi.co/json/");
                if (response.ok) {
                    const data = await response.json();
                    const apiCode = data.country_calling_code;

                    if (apiCode) {
                        const isSupported = COUNTRY_CODES.some((c) => c.code === apiCode);
                        if (isSupported) {
                            setDetectedCode(apiCode);
                            sessionStorage.setItem("atasaedu_user_calling_code", apiCode);
                        }
                    }
                }
            } catch {
                // Country detection failed, defaulting to +90
            }
        };

        detectCountry();
    }, []);

    return detectedCode;
};
