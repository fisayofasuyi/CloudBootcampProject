INSERT INTO public.users (display_name, handle, cognito_user_id) VALUES 
('Fisayo Fasuyi', 'fisayofasuyi', 'MOCK'),
('Fred Mann', 'fredmann', 'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES

(
    (SELECT uuid from public.users WHERE users.handle = 'fisayofasuyi' LIMIT 1),
'this was imported data',
current_timestamp + interval '10 day'
);