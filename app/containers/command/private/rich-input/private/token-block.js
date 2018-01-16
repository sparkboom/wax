export default ({token, key, suggestion, onTextSelect}) => {

  return {
    'FIN': null,
    'COMMAND': (<TokenInlineTextBlock key={key} isSelected={token.isSelected}>{token.command}</TokenInlineTextBlock>),
    'CARET': (<Caret key={key} />),
    'SUGGESTION': (<PredictionInlineTextBlock key={key} isSelected={token.isSelected}>{ suggestion && suggestion.predictionText }</PredictionInlineTextBlock>),
    'TEXT': (<InlineTextBlock
                    key={key}
                    isSelected={token.isSelected}
                    onTextSelect={onTextSelect}>
                    {token.text}
            </InlineTextBlock>),
  }[token];
}
