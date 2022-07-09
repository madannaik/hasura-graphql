SET check_function_bodies = false;
CREATE TABLE public.comments (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    comment text NOT NULL,
    photo_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.photos (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    photo_url text NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.test (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    image boolean
);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_photo_id_fkey FOREIGN KEY (photo_id) REFERENCES public.photos(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
