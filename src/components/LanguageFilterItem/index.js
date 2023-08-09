import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateActiveOptionId, activeOptionId} = props
  const {id, language} = languageDetails

  const onSelectingLanguage = event => updateActiveOptionId(event.target.value)

  const isSelected = id === activeOptionId

  const btnStyle = isSelected ? 'selected-btn' : 'btn'

  return (
    <button
      type="button"
      className={btnStyle}
      value={id}
      onClick={onSelectingLanguage}
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
