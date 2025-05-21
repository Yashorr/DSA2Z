export const getLanguageId = (language) =>{
    const languageMap = {
        "PYTHON": 71 ,
        "JAVASCRIPT": 63 ,
        "JAVA":62,
        "CPP": 54 ,
    }

    return languageMap[language.toUpperCase()];
}

export const getLanguageName = (languageid) =>{
    const languageNames = {
        71:"PYTHON" ,
        63:"JAVASCRIPT" ,
        62 :"JAVA",
        54 :"CPP",
       
    }

    return languageNames[languageid];
}