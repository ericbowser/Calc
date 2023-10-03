-- we don't know how to generate root <with-no-name> (class Root) :(

comment on database postgres is 'default administrative connection database';

create table "User"
(
    userid   serial
        primary key,
    username text    not null,
    password text    not null,
    active   boolean not null
);

alter table "User"
    owner to postgres;

