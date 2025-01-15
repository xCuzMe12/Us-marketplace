# UŠ
### https://us-react.web.app/

## Avtorji
- **Matej Pavli** (63230235)
- **Matic Rape** (63230276)

---

## Zaslonske slike

### Mobilna aplikacija
1. ![image](https://github.com/user-attachments/assets/67f7709e-d6ac-4d22-b4ff-42707c714bd0)


### Spletna aplikacija
2. ![Moji oglasi](https://github.com/user-attachments/assets/62b0cb05-6e4c-4935-8b4e-66b107961bfc)
3. ![Začetna stran](https://github.com/user-attachments/assets/767b788b-cbdc-4611-9901-5af9fc313437)
4. ![Objava oglasa](https://github.com/user-attachments/assets/1cdb41f6-f0d7-49a5-977b-55b68971b718)
5. ![Sporočilo](https://github.com/user-attachments/assets/d54a9f05-cd25-44ed-b5b8-b22f5a7ba353)





## Kratek opis sistema
- Spletna aplikacija UŠ je namenjena oglaševanju na black marketu (na podoben način kot bolha). Uporabnik se mora prijaviti da lahko objavi oglas in kontaktira oglaševalca. Pri iskanju oglasov si je mogoče pomagati s filtri po kategorijah, storitvah/produktih in imenu ogalševalca. Uporabnik lahko hitro sortira tudi po oglasih ki jih je objavil in jih tudi izbriše. Ko se nekdo odzove na oglas bo oglaševalec prejel sporočilo (na katerega lahko odgovori). Aplikacija ima sodoben izgled in vključuje stran, ki predstavi aplikacijo. 
- Pri objavi oglasa je mogoče izbrati kategorijo, ali gre za produkt/storitev, naslov oglasa, sliko in ceno (ime in kontakt do oglaševalca se izpolnijo avtomatično po objavi). Ko uporabnik izbere "objavi" bo oglas prikazan javno skupaj z ostalimi na začetni strani.
- Prijava je izvedena preko firebase API-ja na način prijave z gmail-om. 
- mobilna aplikacija TODO

---

## Naloge posameznih avtorjev
- **Matej Pavli**: Izgled, objava oglasa, filtreranje po oglasih, vzpostavljanje baze.
- **Matic Rape**: Izgled, prijava, pogled na svoje oglase, sistem sporočil, vzpostavljanje baze.

---

## Podatkovni model podatkovne baze
![Izgled baze]()
---![image](https://github.com/user-attachments/assets/4d9e5633-d977-4464-afb3-c99d3ca2a2fa)

### Opis podatkovnega modela
- Entitete: ads, users, sporočila
- Entitete so povezane po atributu imena oglaševalca in njegovega kontakta.
- ads: cena (string poljubne oblike €/$/... /gram/glavo/...), imgSrc (slika v base64 stringu), seller (ime oglaševalca), naslov, kategorija (orožje/droge/ljudje/organi/tehnika/ostalo), opis, type (produkt/storitev)
- sporocila: prejemnik (gmail), posiljatelj (gmail), casSporocila (timestamp kdaj je bilo poslano), jeNovo (označeno v aplikaciji), sporocilo.
- users: displayName (ime ki se bo prikazalo na zaslonu), gmail (e-naslov za kontakt in prijavo), editor (priviligeran račun za upravljanje s tujimi oglasi - administrator).
