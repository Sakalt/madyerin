document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');
    const toggleFontButton = document.getElementById('toggle-font');
    
    let isMadueyer = false;
    
    // JSONデータの読み込み
    fetch('madueyer_dictionary.json')
        .then(response => response.json())
        .then(data => {
            const words = data.words;
            
            // 検索機能の実装
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const filteredWords = words.filter(word =>
                    word.entry.form.toLowerCase().includes(query)
                );
                displayResults(filteredWords);
            });

            // 検索結果の表示
            function displayResults(words) {
                resultsDiv.innerHTML = '';
                words.forEach(word => {
                    const wordDiv = document.createElement('div');
                    wordDiv.classList.add('word-entry');
                    wordDiv.innerHTML = `
                        <h3>${word.entry.form}</h3>
                        ${word.translations.map(t => `
                            <p><strong>${t.title}:</strong> ${t.forms.join(', ')}</p>
                        `).join('')}
                        ${word.contents.map(c => `
                            <div>
                                <strong>${c.title}:</strong> ${c.text}
                            </div>
                        `).join('')}
                    `;
                    resultsDiv.appendChild(wordDiv);
                });
            }

            // 初期表示
            displayResults(words);
        });

    // フォント切替の実装
    toggleFontButton.addEventListener('click', () => {
        if (isMadueyer) {
            document.body.classList.remove('madueyer');
            toggleFontButton.textContent = 'フォント変更';
        } else {
            document.body.classList.add('madueyer');
            toggleFontButton.textContent = '元のフォントに戻す';
        }
        isMadueyer = !isMadueyer;
    });
});
