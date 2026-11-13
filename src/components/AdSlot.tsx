import { useEffect, useRef } from 'react';

interface AdSlotProps {
  /** AdSense ad unit ID (data-ad-slot). Omit to let Auto ads place the unit instead. */
  slot?: string;
  className?: string;
}

const AD_CLIENT = 'ca-pub-7851393090887931';

/**
 * Renders a real Google AdSense display unit. Nothing is rendered unless a slot ID
 * is supplied, so no empty placeholder boxes ever ship to visitors or reviewers.
 */
function AdSlot({ slot, className = '' }: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      /* ad script blocked or unavailable */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default AdSlot;
