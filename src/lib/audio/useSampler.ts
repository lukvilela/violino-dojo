"use client";

import { useEffect, useState } from "react";
import { preload, subscribe, SamplerStatus } from "./player";

/** Dispara o download das amostras reais e acompanha o estado de carregamento. */
export function useSampler(instrumentId: string): SamplerStatus {
  const [status, setStatus] = useState<SamplerStatus>("idle");
  useEffect(() => {
    preload(instrumentId);
    return subscribe(instrumentId, setStatus);
  }, [instrumentId]);
  return status;
}
