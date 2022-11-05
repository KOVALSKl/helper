import './SearchSelect.scss'

type SearchSelectProps = {
    symptomsLength: number
    listVisible: boolean;
    changeListVisible: (value: boolean) => void;
    setSearchValue: (value: string) => void;
}

function SearchSelect({ symptomsLength, listVisible, changeListVisible, setSearchValue }: SearchSelectProps) {

    return (
        <div className='search-select'>
            <img src={require('../../assets/search-icon.svg').default} id='search-icon' />
            <input
                className={['search-select__input', (listVisible) ? 'active' : ''].join(' ')}
                placeholder='поиск симптомов'
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                className='search-select__button'
                onClick={() => {
                    if (symptomsLength !== 0) changeListVisible(!listVisible)
                }}>
                <img
                    src={require('../../assets/green-down-arrow.svg').default}
                    className={(listVisible) ? 'active' : ''}
                />
            </button>
        </div >
    );
}

export default SearchSelect;