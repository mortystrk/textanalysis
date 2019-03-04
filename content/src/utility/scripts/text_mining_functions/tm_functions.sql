/*******
    get relevant terms
*******/

SELECT T.TERM, T.NORMALIZED_TERM, T.TERM_TYPE, T.TERM_FREQUENCY, T.DOCUMENT_FREQUENCY, T.SCORE
FROM TM_GET_RELEVANT_TERMS (
    DOCUMENT IN FULLTEXT INDEX WHERE key_column_name = 1
    SEARCH "target_column_name" FROM "target_schema_name"."target_table_name"
    RETURN TOP 100
) AS T;