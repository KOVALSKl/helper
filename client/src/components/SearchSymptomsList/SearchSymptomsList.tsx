import { useEffect, useMemo, useState } from 'react';
import { useGetSymptomsQuery } from '../../redux/api/symptomsApi';
import { Symptom } from '../../types/types';
import SearchBar from '../SearchBar/SearchBar';
import SymptomsList from '../SymptomsList/SymptomsList';
import './SearchSymptomsList.scss'

type SearchSymptomsList = {
    classNames?: string[]
}

function SearchSymptomsList({ classNames = [] }: SearchSymptomsList) {

    const { data, isLoading, error } = useGetSymptomsQuery();

    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [listVisible, setListVisible] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setSymptoms(data.map((item) => new Symptom(item)))
        }
    }, [data])

    const sortedSymptoms = useMemo(() => {
        return (searchValue !== '')
            ? symptoms.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            : symptoms
    }, [searchValue, symptoms])

    return (
        <div className={['search-symptoms-list', ...classNames].join(' ')}>
            <SearchBar
                symptomsLength={symptoms.length}
                listVisible={listVisible}
                changeListVisible={setListVisible}
                setSearchValue={setSearchValue} />
            {
                (!listVisible)
                    ? null
                    : <SymptomsList
                        list={sortedSymptoms}

                    />
            }
        </div>
    );
}

export default SearchSymptomsList;