# PLP Chatbot Suggestions Dictionary
suggestions = {
    "Start": {
        "About PLP": {
            "Who are we?": [
                "What is Power Learn Project?",
                "Tell me about PLP",
                "What does PLP do?",
                "What is PLP's mission?",
            ],
            "Leadership": [
                "Who are PLP's leaders?",
                "Tell me about PLP's leadership team",
                "Who is in charge of PLP?",
                "Who is the Executive Director of PLP?",
            ],
            "Board of Trustees": [
                "Who are the board members?",
                "Tell me about PLP's board",
                "Who is on PLP's Board of Trustees?",
                "Who is the Board Chairperson?",
            ],
            "Program Countries": [
                "Where does PLP operate?",
                "Which countries have PLP programs?",
                "Where is PLP located?",
                "What are PLP's program countries?",
            ],
        },
        "Programs": {
            "1 Million Devs Program": [
                "What is the 1 Million Devs for Africa Program?",
                "Tell me about the 16-week course",
                "What programming languages do you teach?",
                "Is the program free?",
            ],
            "County Model": [
                "What is the County Model?",
                "How does PLP work with counties?",
                "Tell me about county programs",
                "What is CIDP?",
            ],
            "Displaced Communities": [
                "How does PLP help displaced communities?",
                "Tell me about the displaced communities program",
                "What support is available for displaced persons?",
                "How can I help displaced communities?",
            ],
        },
        "Community": {
            "Power Community": [
                "What is the Power Community?",
                "How can I join the community?",
                "What activities happen in the community?",
                "Tell me about community features",
            ],
            "Success Stories": [
                "Who has succeeded through PLP?",
                "Tell me about PLP alumni",
                "Share some success stories",
                "Who are PLP's successful graduates?",
            ],
        },
        "Contact": {
            "General Inquiries": [
                "How can I contact PLP?",
                "What is PLP's email address?",
                "What is PLP's phone number?",
                "How do I reach out to PLP?",
            ],
            "Academy Support": [
                "How can I get help with my studies?",
                "What is the academy support contact?",
                "Who do I contact for academic issues?",
                "How do I reach PLP academy?",
            ],
            "Partnerships": [
                "How can I partner with PLP?",
                "What is the partnerships email?",
                "How do I collaborate with PLP?",
                "Tell me about PLP partnerships",
            ],
        },
        "Eligibility": {
            "Program Requirements": [
                "What do I need to join PLP?",
                "What are the requirements?",
                "Who can apply to PLP?",
                "Am I eligible for PLP programs?",
            ],
            "Technical Requirements": [
                "What equipment do I need?",
                "Do I need coding experience?",
                "What computer specifications are required?",
                "Do I need internet access?",
            ],
        },
        "Impact": {
            "Goals and Vision": [
                "What is PLP's vision?",
                "What are PLP's goals?",
                "Tell me about PLP's impact",
                "What is PLP trying to achieve?",
            ],
            "Success Metrics": [
                "How many developers has PLP trained?",
                "What is PLP's impact so far?",
                "How successful is PLP?",
                "Tell me about PLP's achievements",
            ],
        },
    }
}


def accept_each_level(dictionary, level=0):
    for key, value in dictionary.items():
        print(f"Level {level}: Key: {key}")
        if isinstance(value, dict):
            accept_each_level(value, level + 1)
        else:
            print(f"Level {level}: Value 1: {value[0]}")
            if len(value) > 1:
                print(f"Level {level}: Value 2: {value[1]}")


def suggestionsGenerator(
    input_str, dictionary, partial_matching=False, case_sensitive=False
):
    if dictionary is None:
        dictionary = suggestions
    words = input_str.split()
    matches = []
    possible_suggestions = []
    results = []

    def recursive_search(d, words, path=""):
        for key, value in d.items():
            match_count = sum(
                1
                for word in words
                if (partial_matching and word.lower() in key.lower())
                or (
                    not partial_matching
                    and (word.lower() in key.lower() or word.lower() == key.lower())
                )
            )
            if match_count > 0:
                # print("MAtch:",key)
                # print("Values:",value)
                matches.append(key)
                possible_suggestions.append(value)
                results.append((path + key, value, match_count))
            if isinstance(value, dict):
                recursive_search(value, words, path + key + " -> ")

    recursive_search(dictionary, words)
    print(f"Number of matches:{len(results)}")
    return (
        matches,
        possible_suggestions,
        sorted(results, key=lambda x: x[2], reverse=True)
    )  


def main():
    # Call the function to accept each level of the dictionary
    # accept_each_level(suggestions)

    while True:
        # Take user input
        user_input = input("Enter your query: ")

        # Option to toggle partial matching
        # partial_match_input = input("Enable partial word matching? (yes/no): ").lower()
        partial_matching = True  # partial_match_input == "yes"

        # Option to toggle case sensitivity
        # case_sensitive_input = input("Enable case sensitivity? (yes/no): ").lower()
        case_sensitive = True  # case_sensitive_input == "yes"

        # Search the dictionary for matching values
        matches, possible_suggestions, matching_values = suggestionsGenerator(
            user_input,
            suggestions,
            partial_matching=partial_matching,
            case_sensitive=case_sensitive,
        )

        if matching_values:
            print("Matching values found:")
            # print("possible_suggestions :", possible_suggestions)
            for key, value, count in matching_values:
                print(f"Path: {key} (Matches: {count})")
                if isinstance(value, list):
                    for item in value:
                        print(f"  - {item}")
                elif isinstance(value, dict):
                    for sub_key, sub_value in value.items():
                        print(f"  Sub-Key: {sub_key}")
                        if isinstance(sub_value, list):
                            for item in sub_value:
                                print(f"    - {item}")
            for match in matches:
                print("MAtch:", match)
            for ps in possible_suggestions:
                # print("Possible Suggestion:", ps)
                for key in ps:
                    print("Possible Suggestion:", key)
        else:
            print("No matching values found.")


# user_input = "account"
if __name__ == '__main__':
    # suggestionsGenerator(user_input, suggestions, partial_matching=partial_matching, case_sensitive=case_sensitive)
    main()
