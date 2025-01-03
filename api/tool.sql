-- EXPLAIN QUERY PLAN
-- SELECT sense.pos, GROUP_CONCAT(DISTINCT(gloss_list.gloss)) as gloss
-- FROM jmdict_r_ele AS reading 
-- JOIN jmdict_sense AS sense
-- ON sense.seq = reading.seq
-- JOIN jmdict_gloss_list AS gloss_list 
-- ON gloss_list.senseID = sense.senseID
-- JOIN jmdict_k_ele as kanji
-- ON kanji.seq = reading.seq
-- WHERE (kanji.keb = '彼' OR reading.reb = '彼') AND sense.pos LIKE '%noun%'


-- SELECT * 
-- FROM jmdict_r_ele
-- ORDER BY seq DESC
-- LIMIT 1000

-- CREATE INDEX idx_jmdict_r_ele_seq ON jmdict_r_ele(seq)

-- CREATE INDEX idx_jmdict_sense_seq ON jmdict_sense(seq)
-- CREATE INDEX idx_jmdict_gloss_list_senseID ON jmdict_gloss_list(senseID)
-- CREATE INDEX idx_jmdict_k_ele_seq ON jmdict_k_ele(seq)
-- CREATE INDEX idx_jmdict_sense_senseID ON jmdict_sense(senseID)

-- CREATE INDEX idx_jmdict_k_ele_keb ON jmdict_k_ele(keb)
-- CREATE INDEX idx_jmdict_r_ele_reb ON jmdict_r_ele(reb)
-- CREATE INDEX idx_jmdict_sense_pos ON jmdict_sense(pos)
-- CREATE INDEX idx_jmdict_gloss_list_gloss ON jmdict_gloss_list(gloss)


-- CREATE INDEX idx_jmdict_r_ele_seq_reb ON jmdict_r_ele(seq, reb);
-- CREATE INDEX idx_jmdict_k_ele_seq_keb ON jmdict_k_ele(seq, keb);
-- CREATE INDEX idx_jmdict_sense_seq_pos ON jmdict_sense(seq, pos);
-- CREATE INDEX idx_jmdict_gloss_list_senseID_gloss ON jmdict_gloss_list(senseID, gloss);

EXPLAIN QUERY PLAN
WITH filtered_data AS (
    SELECT sense.seq, gloss_list.gloss, keb, reb
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE 
        (( kanji.keb = '会社' OR reading.reb = '会社' ) AND sense.pos LIKE '%noun%') 

        OR (( kanji.keb = 'その' OR reading.reb = 'その') AND sense.pos LIKE '%adjectival%')
        OR (( kanji.keb = 'その' OR reading.reb = 'その') AND sense.pos LIKE '%adjectival%')
)
SELECT GROUP_CONCAT(DISTINCT gloss) AS gloss, keb, reb
FROM filtered_data
GROUP BY reb, keb

-- GROUP_CONCAT(DISTINCT gloss)

WITH filtered_data AS (
    SELECT sense.seq, gloss_list.gloss, keb, reb
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE 
        (( kanji.keb = '彼' OR reading.reb = '彼' ) AND sense.pos LIKE '%noun%')
)
SELECT GROUP_CONCAT(DISTINCT gloss) AS gloss, keb, reb
FROM filtered_data
GROUP BY reb, keb









EXPLAIN QUERY PLAN
WITH filtered_data AS (
    SELECT sense.seq, gloss_list.gloss, reading.reb AS word, 1 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '映画' OR reading.reb = '映画') AND sense.pos LIKE '%noun%'
    
    UNION ALL

    SELECT sense.seq, gloss_list.gloss, reading.reb AS word, 2 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'を' OR reading.reb = 'を') AND sense.pos LIKE '%particle%'

    UNION ALL

    SELECT sense.seq, gloss_list.gloss, reading.reb AS word, 3 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'とうとう' OR reading.reb = 'とうとう') AND sense.pos LIKE '%adverb%'

    UNION ALL

    SELECT sense.seq, gloss_list.gloss, reading.reb AS word, 4 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '彼ら' OR reading.reb = '彼ら') AND sense.pos LIKE '%noun%'

    UNION ALL

    SELECT sense.seq, gloss_list.gloss, reading.reb AS word, 5 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '敵' OR reading.reb = '敵') AND sense.pos LIKE '%noun%'
)
SELECT GROUP_CONCAT(DISTINCT(gloss) )AS gloss
FROM filtered_data
GROUP BY co;

EXPLAIN QUERY PLAN
WITH filtered_data AS (
    SELECT 
        gloss_list.gloss, 1 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '昨日' OR reading.reb = '昨日') AND sense.pos LIKE '%noun%'
    
    UNION ALL 

    SELECT 
        gloss_list.gloss, 2 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '、' OR reading.reb = '、') AND sense.pos LIKE '%symbol%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 3 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '私' OR reading.reb = '私') AND sense.pos LIKE '%noun%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 4 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'は' OR reading.reb = 'は') AND sense.pos LIKE '%particle%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 5 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '学校' OR reading.reb = '学校') AND sense.pos LIKE '%noun%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 6 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'から' OR reading.reb = 'から') AND sense.pos LIKE '%particle%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 7 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '帰る' OR reading.reb = '帰る') AND sense.pos LIKE '%verb%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 8 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '途中' OR reading.reb = '途中') AND sense.pos LIKE '%noun%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 9 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'にわか雨' OR reading.reb = 'にわか雨') AND sense.pos LIKE '%noun%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 10 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'に' OR reading.reb = 'に') AND sense.pos LIKE '%particle%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 11 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'あっ' OR reading.reb = 'あっ') AND sense.pos LIKE '%verb%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 12 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = 'た' OR reading.reb = 'た') AND sense.pos LIKE '%auxiliary%'

    UNION ALL 

    SELECT 
        gloss_list.gloss, 13 as co
    FROM jmdict_r_ele AS reading 
    JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    WHERE (kanji.keb = '。' OR reading.reb = '。') AND sense.pos LIKE '%symbol%'
)
SELECT GROUP_CONCAT(DISTINCT(gloss)) AS gloss
FROM filtered_data
GROUP BY co;


EXPLAIN QUERY PLAN
SELECT 
    k.*, GROUP_CONCAT(d.meaning) AS meanings
FROM
    kanji k
JOIN
    desc  d
    ON d.m_element = k.k_element
WHERE 
    'どうぞ君の案を会議に持ち出してください'
    LIKE CONCAT('%', k_element, '%') 


CREATE INDEX idx_kanji_k_element ON kanji(k_element)
CREATE INDEX idx_desc_m_element ON desc(m_element)


CREATE TABLE composition(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    


)

    -- SELECT sense.seq, gloss_list.gloss, reading.reb AS word
    -- FROM jmdict_r_ele AS reading 
    -- JOIN jmdict_sense AS sense ON sense.seq = reading.seq
    -- JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
    -- JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
    -- WHERE (kanji.keb = '無料' OR reading.reb = '無料')

WITH filtered_data AS (

            SELECT 
            gloss_list.gloss, 0 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = '英語' OR reading.reb = '英語' ) AND sense.pos LIKE '%noun%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 1 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = '番組' OR reading.reb = '番組' ) AND sense.pos LIKE '%noun%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 2 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = '聴け' OR reading.reb = '聴け' ) AND sense.pos LIKE '%verb%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 3 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = '無料' OR reading.reb = '無料' ) AND sense.pos LIKE '%noun%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 4 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = '英語' OR reading.reb = '英語' ) AND sense.pos LIKE '%noun%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 5 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = '勉強' OR reading.reb = '勉強' ) AND sense.pos LIKE '%noun%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 6 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = 'する' OR reading.reb = 'する' ) AND sense.pos LIKE '%verb%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 7 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = 'こと' OR reading.reb = 'こと' ) AND sense.pos LIKE '%noun%'
            UNION ALL 
            SELECT 
            gloss_list.gloss, 8 as co, kanji.keb, reading.reb
            FROM jmdict_r_ele AS reading 
            JOIN jmdict_sense AS sense ON sense.seq = reading.seq
            JOIN jmdict_gloss_list AS gloss_list ON gloss_list.senseID = sense.senseID
            JOIN jmdict_k_ele AS kanji ON kanji.seq = reading.seq
            WHERE (kanji.keb = 'できる' OR reading.reb = 'できる' ) AND sense.pos LIKE '%verb%'
        
)
SELECT *, GROUP_CONCAT(DISTINCT(gloss)) AS gloss
FROM filtered_data
GROUP BY co