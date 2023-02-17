# Prima

Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

[Pages-Version](https://jirkadelloro.github.io/Prima/)

In this course, students learn fundamentals of game engines and development environments for prototyping. They learn basic development patterns used in highly interactive applications such as animation, transformation, object relationships and event control. We analyse concepts for complex applications or simple games, plan the realisation of core features and create executable prototypes for demonstration. In the end, students design their own piece of art and produce it themselves.

The environment we work with is [FUDGE](https://jirkadelloro.github.io/FUDGE), the Furtwangen University Didactic Game Engine/Editor, which allows for optimized tuition and collaboration, while demonstrating the fundamentals of popular engines like Unreal or Unity. Students acquainted to FUDGE can easily shift over to these mighty tools later on. Coding language is [TypeScript](https://typescriptlang.org)
|

## Abgabe

**Spiele-Titel und Autor**<br>
Dino_Bomb<br>
Jan Christmeier<br>
263164

**Modul und Jahr**<br>
PRIMA - Wintersemester 2022/23<br>

**Studiengang**<br>
Medieninformatik 7 Semester<br>

**Dozent**<br>
Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl<br>
Hochschule Furtwangen<br>

### Links

[GitHub Pages](https://pretteter.github.io/PRIMA_JAN/Abgabe/index)<br>
[Source Code](https://github.com/pretteter/PRIMA_JAN/tree/main/Abgabe/Script/Source)<br>
[Konzept](https://github.com/pretteter/PRIMA_JAN/blob/main/Abgabe/Design_Document_Christmeier_Jan_PRIMA_MIB_WS_2022-2023.pdf)<br>

### Default-Steuerung
Der linke Char bewegt sich mit WASD und schießt mit SPACE
Der rechte Char bewegt sich mit den Pfeiltasten und schießt mit Numpad0

## Checkliste für die Abschlussarbeit

© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
| Nr | Kriterium | Erläuterung |
| ---: | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Units and Positions | Null ist genau in der Mitte der Welt (0/0/0). Eins ist eine Standarteinheit von Fudge. Ein Charakter und auch eine Bombe sind von Grund auf in der Mitte aufgehängt. Ein Charakter ist 1 groß. Somit muss einmal per Code eine Verschiebung um 0,5 stattfinden. |
| 2 | Hierarchy | Explain the setup of the graphs and the advantages you gain by it. |
| 3 | Editor | Alle statischen Elemente sind per Editor erstellt. Alle dynamischen Objekte sind per Code erstellt worden. Da in diesem Prototyp sehr viele unterschiedliche dynamische Objekte gleichzeitig angezeigt werden, dynamisch erzeugt und entfernt werden können, ist hier nur eine Umsetzung per Code sinnvoll. Die anderen Objekte müssen nicht derartig dynamisch sein und können so einfacher im Editor erstellt werden |
| 4 | Scriptcomponents | Jedem vierten erzeugten Charakter wird eine Skripskomponente per Code hinzugefügt, welche den Charakter drehen lässt. In diesem Prototyp hat diese Komponente allerdings keinen wirklichen Mehrwert |
| 5 | Extend | Charakter und Bombe sind eigene Klassen, welche Kinderklassen von ƒ.Node sind. Diese Struktur macht es nicht nur einfacher zu programmieren, sie ist für den Prototypen auch nahezu erforderlich. Nur so lässt sich vernünftig eine beliebige Anzahl an Charakteren erzeugen, welche ihre eigenen Bomben abzuschießen haben. |
| 6 | Sound | Es gibt eine Hintergrundmusik, welche in Dauerschleife läuft. Weiterhin gibt es einen kurzen Soundeffekt, wenn eine Bombe abgefeuert wird. Da es sich um ein 2D Game, bei dem eine Richtung des Sounds nahezu irrelevant ist, sind beide Sounds am Hauptgraphen angeheftet |
| 7 | VUI | Auf der linken Seite neben dem Spielfenster werden die erzeugten Charakter-Namen und deren aktuelle Lebenspunkte angezeigt. Die Anzahl der Anzeigen entspricht der Anzahl der erzeugten Charaktere. Bei einem Treffer von einer Bombe werden 25 Leben des Chars abgezogen. Bei null Leben übrig, wird der entsprechende Charakter aus der Welt entfernt |
| 8 | Event-System | Wenn eine Wand eine Bombe per Physik-Event erkennt, soll das Licht im Hauptgraphen seine Farbe ändern. Da die Wände weiter unten in der Hierarchie sind, als das Licht, wird auf Dieses mit mehreren getParent() Befehlen zugegriffen. |
| 9 | External Data | Die Konfigurationsdatei generiert die Charaktere. In dieser kann ein neuer Eintrag des Charakters-Array eingefügt werden, welcher alle relevanten Daten eines Charakters aufweist. Dazu gehören: Name, Steuerung. Startkoordinaten, Drehrichtung und Masse. So können beliebig viele Charaktere erzeugt werden. |
| A | Light | Der World-Graph besitzt eine Lichtkomponente, welche dem Boden (Shader Phong) seine Farbe gibt. Weiterhin besitzt jede Bombe eine Point-Light Komponente, welche per Code der Bombe hinzugefügt wird. Eine so erzeugt Bombe erhellt ein wenig ihrer Umgebung, was am Shader-Phong des Bodens gut zu sehen ist. Das Ambient-Light des Grafen ändert sich bei Berührungen einer Bombe mit der Außenwand. Somit Ändert sich für den Spielenden die Farbe des Bodens. Einen spielerischen Sinn oder Mehrwert hat Licht in diesem Prototypen nicht. Es wäre alles problemlos mit Shader-Lit umsetzbar. |
| B | Physics | Charakter, Bomben, sowie relevante Teile der Welt (um runterfallen zu vermeiden) verwenden Rigidbodys. Die der Welt sind im Editor hinzugefügt worden. Die der Charaktere und Bomben sind per Code generiert. Somit können die verschiedenen Objekte miteinander interagieren und unter anderem über das Physics-Event-System Kollisionen erkennen. Einige Parameter der Physik können über die Konfigurationsdatei geändert werden. Laufgeschwindigkeit und Sprunghöhe sind jedoch Masseunabhängig. Bewegung und Schießen funktioniert über Kräfte, welche den Bomben oder den Charakteren gegeben werden. |
| C | Net | Wurde nicht verwendet |
| D | State Machines | Wurden nicht verwendet |
| E | Animation | Allen erzeugten Charakteren werden Lauf- und Idle-Animationen zugewiesen. Dabei werden 4 unterschiedliche Sprite-Sheets verwendet. Wenn die Charaktere in der Schleife erzeugt werden, wird nach dem vierten Sprite-Sheet wieder das erste genommen. => erster und fünfter Charakter benutzen dasselbe Sheet. Genauso wie der zweite und sechste. |
