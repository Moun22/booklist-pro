// Timestamps come from the server clock; the local clock only chooses the display time zone.
export function formaterHorodatage(iso: string, locale = 'fr-FR'): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
