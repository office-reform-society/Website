export function $(selector: string, parent: Document | HTMLElement = document): HTMLElement | null {
  return parent.querySelector(selector);
}

export function $$(selector: string, parent: Document | HTMLElement = document): HTMLElement[] {
  return Array.from(parent.querySelectorAll(selector));
}
