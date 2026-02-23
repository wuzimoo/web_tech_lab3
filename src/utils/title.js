const BASE_TITLE = 'Web Tech Lab 3'

export function setDocumentTitle(pageTitle) {
  if (typeof document === 'undefined') return
  document.title = pageTitle ? `${pageTitle} | ${BASE_TITLE}` : BASE_TITLE
}
