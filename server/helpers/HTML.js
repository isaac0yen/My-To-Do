function HTML(str) {
  const match = str.match(/<html[^>]*>((.|[\n\r])*)<\/html>/im);
  if (match && match[1]) {
    return match[1];
  } else {
    return '';
  }
}

export default HTML;