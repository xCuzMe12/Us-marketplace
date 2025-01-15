# Naslov projekta

## Avtorji
- **Matej Pavli** (63230235)
- **Matic Rape** (63230276)

---

## Zaslonske slike

### Mobilna aplikacija
1. ![Zaslonska slika 1](pot-do-slike)
2. ![Zaslonska slika 2](pot-do-slike)

### Spletna aplikacija
3. ![Zaslonska slika 3](pot-do-slike)
4. ![Zaslonska slika 4](pot-do-slike)
5. ![Zaslonska slika 5](pot-do-slike)




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
