INSERT INTO workouts (id, slug, title, description, long_description, image)
VALUES
(1, 'yoga', 'Yoga', 'Relax and improve flexibility',
'At Moveo, our experienced yoga instructors guide you through sessions designed to enhance flexibility, balance, and mindfulness. Each class focuses on proper alignment and breathing techniques, helping you reduce stress, improve posture, and increase overall body awareness. Whether you are a beginner or experienced, Moveo’s yoga classes offer a supportive environment to recharge both mind and body.',
'/assets/home/1.jpg'),
(2, 'hiit', 'HIIT', 'High intensity fat burning',
'Moveo’s HIIT classes are led by expert trainers who push you to achieve your maximum potential in a safe and structured way. With a mix of short, intense bursts of cardio, strength, and bodyweight exercises, these sessions rapidly burn fat, increase endurance, and boost your metabolism. The high-energy atmosphere keeps you motivated and challenged in every class.',
'/assets/home/1.jpg'),
(3, 'pilates', 'Pilates', 'Core strength and balance',
'At Moveo, our certified Pilates instructors help you strengthen your core, improve posture, and enhance overall body stability. Classes focus on controlled movements and proper breathing, which support injury prevention and better body awareness. Moveo’s Pilates sessions are tailored to all levels, helping you build a strong foundation for everyday movements and fitness progress.',
'/assets/home/1.jpg'),
(4, 'boxing', 'Boxing', 'Strength and endurance',
'Moveo’s boxing classes combine cardio, strength, and agility under the guidance of experienced trainers. You will learn proper techniques, improve coordination, and build upper body strength while burning calories and relieving stress. Each class is energetic, fun, and designed to challenge you in a supportive environment, suitable for all skill levels.',
'/assets/home/1.jpg'),
(5, 'crossfit', 'Crossfit', 'Full body workout',
'Crossfit at Moveo Gym offers a high-intensity functional training experience led by skilled coaches. You will work on strength, stamina, and mobility using a variety of exercises including weightlifting, cardio, and bodyweight movements. Classes are structured to push your limits safely while fostering a motivating team environment, helping you reach both fitness and personal goals.',
'/assets/home/1.jpg'),
(6, 'zumba', 'Zumba', 'Fun dance workout',
'Moveo’s Zumba sessions are lively dance classes set to energetic music, led by passionate instructors. They are designed to improve cardiovascular health, coordination, and endurance, all while having fun and staying motivated. The friendly and social environment at Moveo makes every class enjoyable, perfect for anyone looking to combine fitness with dance.',
'/assets/home/1.jpg'),
(7, 'running', 'Running', 'Cardio for stamina',
'At Moveo, our running sessions are tailored to improve cardiovascular endurance, strengthen legs, and boost stamina. Led by experienced trainers, each session includes warm-ups, pacing strategies, and guidance to enhance performance safely. Whether you are training for an event or improving general fitness, Moveo running classes provide motivation and structured support.',
'/assets/home/1.jpg'),
(8, 'cycling', 'Cycling', 'Endurance and leg strength',
'Moveo’s indoor cycling classes are energetic sessions guided by expert instructors. With varying intensity levels, intervals, and motivating music, you’ll improve endurance, strengthen leg muscles, and burn calories efficiently. Each class is designed to challenge you while maintaining a supportive and fun environment, suitable for beginners and advanced cyclists alike.',
'/assets/home/1.jpg'),
(9, 'stretching', 'Stretching', 'Flexibility and recovery',
'Stretching at Moveo is guided by experienced trainers who focus on improving flexibility, releasing muscle tension, and aiding recovery after workouts. Classes include a variety of techniques for all muscle groups and are tailored to your level. Moveo’s stretching sessions help prevent injuries, improve mobility, and promote relaxation in a calm and supportive environment.',
'/assets/home/1.jpg');

INSERT INTO coaches (id, slug, name, title, bio, image)
VALUES
(1, 'alice-johansson', 'Alice Johansson', 'Yoga & Pilates Specialist',
'Alice makes yoga fun and energizing, guiding you to boost flexibility, strengthen your core, and find calm, all with a smile and personalized flows that keep every session exciting.',
'/assets/coach/3.png'),
(2, 'oscar-lund', 'Oscar Lund', 'Crossfit & Strength Coach',
'Oscar creates functional strength training sessions that push your limits while emphasizing proper form, injury prevention, and steady progression. Each workout is tailored to help you grow stronger, safer, and more confident.',
'/assets/coach/1.jpg'),
(3, 'linnea-sjoberg', 'Linnea Sjöberg', 'Boxing',
'Linnea combines expert boxing techniques with strength and agility training, helping clients build endurance, power, and confidence in every session. She tailors each workout to challenge you safely while keeping it fun and motivating.',
'/assets/coach/2.jpg');


INSERT INTO coach_sessions (coach_id, start_date, end_date)
SELECT
    c.coach_id,
    d.day + INTERVAL '10 hour' AS start_date,
    d.day + INTERVAL '11 hour' AS end_date
FROM (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 months',
        INTERVAL '1 day'
    ) AS day
) d
CROSS JOIN (
    SELECT generate_series(1, 3) AS coach_id
) c

UNION ALL

SELECT
    c.coach_id,
    d.day + INTERVAL '12 hour' AS start_date,
    d.day + INTERVAL '13 hour' AS end_date
FROM (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 months',
        INTERVAL '1 day'
    ) AS day
) d
CROSS JOIN (
    SELECT generate_series(1, 3) AS coach_id
) c;

INSERT INTO workout_sessions (workout_id, start_date, end_date, capacity, booked)
SELECT
    c.workout_id,
    d.day + INTERVAL '10 hour' AS start_date,
    d.day + INTERVAL '11 hour' AS end_date,
	10,
	0
FROM (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 months',
        INTERVAL '1 day'
    ) AS day
) d
CROSS JOIN (
    SELECT generate_series(1, 9) AS workout_id
) c

UNION ALL

SELECT
    c.workout_id,
    d.day + INTERVAL '13 hour' AS start_date,
    d.day + INTERVAL '14 hour' AS end_date,
	10,
	0
FROM (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 months',
        INTERVAL '1 day'
    ) AS day
) d
CROSS JOIN (
    SELECT generate_series(1, 9) AS workout_id
) c;
