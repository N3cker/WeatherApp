async function getQuoteData() {
    const URL = 'https://api.quotable.io/random'
    const response = await fetch(URL);
    
    if(!response.ok)
    return alert(`Error: ${response.status}\nstatusText: ${response.statusText}`);
    
    const quote = await response.json();
    const { author, content } = quote;
    
    return { author, content }
}   

async function createQuote() {
    const quoteWrapper = document.querySelector('.sentence-text');
    const quote = await getQuoteData();

    const p = document.createElement('p');
    const span = document.createElement('span');

    p.innerText = quote.content;
    span.innerText = quote.author;

    quoteWrapper.appendChild(p);
    quoteWrapper.appendChild(span);
}

createQuote();