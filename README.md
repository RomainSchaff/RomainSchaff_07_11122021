Projet 7 Groupomania (Réseau social de l'entreprise)

Voici le dernier projet de la formation chez Openclassroom, j'ai codé le Back et le Front dans ce projet.
J'utilise SQL et j'ai opté comme SGBDR pour MySQL. Le serveur back se lance sur le port 4000 donc à l'adresse: https://localhost:4000 car j'utilise le port 3000 pour le front mais c'est totalement arbitraire.

Ce projet a été codé avec REACT après m'être renseigné sur ce framework il me semblait être un bon choix pour commencer. J'ai utilisé la librairie react-router-dom. J'ai beaucoup utilisé les différents HOOK comme useState et useEffect et un peu useContext ce dernier surtout pour stocker les informations générales de mon utilisateur que je réutilise dans tout le site. Je n'utilise pas REDUX j'ai pu me débrouiller sans.

J'utilise pas mal de package pour certaines fonctionnalités comme les dates: REACT-MOMENT, mais aussi REACT-LOADER-SPINNER pour similer le chargement de mes posts par exemple et REACT-CONFIRM-ALERT pour afficher une fenêtre de confirmation quand l'utilisateur effectue des actions importantes. J'utilise aussi certains composant de Material UI que j'ai personnalisé pour avoir un rendu le plus simple et efficace possible comme certains Button et des textField. J'ai utilisé styled-components pour la forme de beaucoup de composants aussi. Et j'utilise axios pour mes requêtes.

Voilà pour la présentation global du projet, j'ai appris beaucoup de chose en codant ce projet j'imagine que le code n'est pas parfait mais ça fonctionne bien.

Pour lancer ce projet:

Rendez-vous dans Backend et intaller node et toute les dépendances:

cd back/ && npm i

Vous pouvez désormais lancer le server qui sera sur le port 4000:

nodemon server.js

Votre serveur est prêt maintenant rendez-vous dans le dossier frontend:

cd frontend

puis lancer React:

npm start / yarn start
