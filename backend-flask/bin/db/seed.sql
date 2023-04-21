INSERT INTO public.users (display_name, email, handle, cognito_user_id) VALUES 
('Fisayo Fasuyi', 'fasuyifisayo@gmail.com','fisayofasuyi', 'MOCK'),
('Fred Mann', 'fisayofasuyi@yahoo.com','fredmann', 'MOCK'),
('Tom Brady', 'fisayofasuyi@outlook.com', 'tombrady', 'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES

(
    (SELECT uuid from public.users WHERE users.handle = 'fisayofasuyi' LIMIT 1),
'this was imported data',
current_timestamp + interval '10 day'
);